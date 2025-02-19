import { it } from 'node:test'
import { EntityWithId, storageService } from './async-storage.service'
import { utilService } from './util.service'

const STORAGE_KEY = 'suggestions'

export interface Suggestions {
  currentUser: {
    [key: string]: string | number | boolean
  }
  productRequests: {
    _id: string | number
    title: string
    category: string
    upvotes: number
    status: string
    description: string
    comments?: {
      _id: string | number
      content: string
      user: {
        [key: string]: string
      }
      replies?: {
        content: string
        replyingTo: string
        user: {
          [key: string]: string
        }
      }[]
    }[]
  }[]
}

export interface FilterBy {
  ALL?: boolean
  UI?: boolean
  UX?: boolean
  Enhancement?: boolean
  Bug?: boolean
  Feature?: boolean
}

export interface SortBy {
  mostupvotes?: boolean
  leastupvotes?: boolean
  mostcomments?: boolean
  leastcomments?: boolean
}

export interface SelectCategory {
  UI?: boolean
  UX?: boolean
  Enhancement?: boolean
  Bug?: boolean
  Feature?: boolean
}

export const feedbackService = {
  query,
  getSuggestionById,
  remove,
  saveSuggestion,
  editSuggestion,
}

async function query(
  filterBy: FilterBy = {},
  sortBy: SortBy = {}
): Promise<Suggestions[]> {
  let suggestions = (await storageService.query(STORAGE_KEY)) as Suggestions[]
  const { mostupvotes, leastupvotes, mostcomments, leastcomments } = sortBy

  const { ALL, UI, UX, Enhancement, Bug, Feature } = filterBy

  if (mostupvotes) {
    suggestions = suggestions.map((suggestion) => {
      suggestion.productRequests = suggestion.productRequests.sort(
        (requestA, requestB) => requestB.upvotes - requestA.upvotes
      )
      return suggestion
    })
  } else if (leastupvotes) {
    suggestions = suggestions.map((suggestion) => {
      suggestion.productRequests = suggestion.productRequests.sort(
        (requestA, requestB) => requestA.upvotes - requestB.upvotes
      )
      return suggestion
    })
  } else if (mostcomments) {
    suggestions = suggestions.map((suggestion) => {
      suggestion.productRequests = suggestion.productRequests.sort(
        (requestA, requestB) => {
          const commentsA = requestA.comments?.length || 0
          const commentsB = requestB.comments?.length || 0
          return commentsB - commentsA
        }
      )
      return suggestion
    })
  } else if (leastcomments) {
    suggestions = suggestions.map((suggestion) => {
      suggestion.productRequests = suggestion.productRequests.sort(
        (requestA, requestB) => {
          const commentsA = requestA.comments?.length || 0
          const commentsB = requestB.comments?.length || 0
          return commentsA - commentsB
        }
      )
      return suggestion
    })
  }

  if (!ALL) {
    const activeCategories: string[] = []
    if (UI) activeCategories.push('UI')
    if (UX) activeCategories.push('UX')
    if (Bug) activeCategories.push('bug')
    if (Enhancement) activeCategories.push('enhancement')
    if (Feature) activeCategories.push('feature')

    if (activeCategories.length > 0) {
      suggestions = suggestions.map((suggestion) => {
        suggestion.productRequests = suggestion.productRequests.filter((item) =>
          activeCategories.includes(item.category)
        )
        return suggestion
      })
    }
  }

  return suggestions
}

async function getSuggestionById(
  productId: string | number
): Promise<Suggestions['productRequests'][0] | null> {
  const suggestions = (await storageService.query(STORAGE_KEY)) as Suggestions[]

  for (const suggestion of suggestions) {
    const productRequest = suggestion.productRequests.find(
      (request) => request._id === productId
    )
    if (productRequest) {
      return productRequest
    }
  }

  return null
}

export function remove(suggestion: any) {}
async function saveSuggestion(suggestion: EntityWithId) {
  try {
    suggestion = {
      ...suggestion,
      _id: utilService.getRandomIntInclusive(100, 10000),
    }
    const suggestions = await storageService.query(STORAGE_KEY)
    suggestions.forEach((item: any) => {
      const products = item.productRequests
      products.push(suggestion)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions))
    })
    return suggestion
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry coudn't add suggestion")
  }
}
async function editSuggestion(updatedSuggestion: EntityWithId) {
  try {
    const suggestions = await storageService.query(STORAGE_KEY)

    // Find the parent item that contains the `productRequests` array
    const parentIdx = suggestions.findIndex((item: any) =>
      item.productRequests.some(
        (product: any) => product._id === updatedSuggestion._id
      )
    )

    if (parentIdx < 0) {
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedSuggestion._id} in: ${STORAGE_KEY}`
      )
    }

    // Find the index of the specific suggestion within `productRequests`
    const parent = suggestions[parentIdx]
    const productIdx = parent.productRequests.findIndex(
      (product: any) => product._id === updatedSuggestion._id
    )

    if (productIdx < 0) {
      throw new Error(
        `Update failed, cannot find product with id: ${updatedSuggestion._id} in productRequests`
      )
    }

    // Update the suggestion
    parent.productRequests[productIdx] = updatedSuggestion

    // Save updated suggestions to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions))

    return updatedSuggestion
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    throw new Error("Sorry, couldn't edit suggestion")
  }
}

if (!localStorage.getItem(STORAGE_KEY)) {
  const suggestions: Suggestions[] = [
    {
      currentUser: {
        _id: 'u101',
        image: '../src/assets/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
        password: 1234,
        isAdmin: true,
      },
      productRequests: [
        {
          _id: 1,
          title: 'Add tags for solutions',
          category: 'enhancement',
          upvotes: 112,
          status: 'suggestion',
          description:
            'Easier to search for solutions based on a specific stack.',
          comments: [
            {
              _id: 1,
              content:
                'Awesome _idea! Trying to find framework-specific projects within the hubs can be tedious',
              user: {
                image: '../src/assets/user-images/image-suzanne.jpg',
                name: 'Suzanne Chang',
                username: 'upbeat1811',
              },
            },
            {
              _id: 2,
              content:
                'Please use fun, color-coded labels to easily _identify them at a glance',
              user: {
                image: '../src/assets/user-images/image-thomas.jpg',
                name: 'Thomas Hood',
                username: 'brawnybrave',
              },
            },
          ],
        },
        {
          _id: 2,
          title: 'Add a dark theme option',
          category: 'feature',
          upvotes: 99,
          status: 'suggestion',
          description:
            'It would help people with light sensitivities and who prefer dark mode.',
          comments: [
            {
              _id: 3,
              content:
                'Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.',
              user: {
                image: '../src/assets/user-images/image-elijah.jpg',
                name: 'Elijah Moss',
                username: 'hexagon.bestagon',
              },
            },
            {
              _id: 4,
              content:
                'Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.',
              user: {
                image: '../src/assets/user-images/image-james.jpg',
                name: 'James Skinner',
                username: 'hummingbird1',
              },
              replies: [
                {
                  content:
                    "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                  replyingTo: 'hummingbird1',
                  user: {
                    image: '../src/assets/user-images/image-anne.jpg',
                    name: 'Anne Valentine',
                    username: 'annev1990',
                  },
                },
                {
                  content:
                    "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
                  replyingTo: 'annev1990',
                  user: {
                    image: '../src/assets/user-images/image-ryan.jpg',
                    name: 'Ryan Welles',
                    username: 'voyager.344',
                  },
                },
              ],
            },
          ],
        },
        {
          _id: 3,
          title: 'Q&A within the challenge hubs',
          category: 'feature',
          upvotes: 65,
          status: 'suggestion',
          description: 'Challenge-specific Q&A would make for easy reference.',
          comments: [
            {
              _id: 5,
              content:
                "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the m_iddle of it.",
              user: {
                image: '../src/assets/user-images/image-george.jpg',
                name: 'George Partr_idge',
                username: 'soccerviewer8',
              },
            },
          ],
        },
        {
          _id: 4,
          title: 'Add image/v_ideo upload to feedback',
          category: 'enhancement',
          upvotes: 51,
          status: 'suggestion',
          description:
            'Images and screencasts can enhance comments on solutions.',
          comments: [
            {
              _id: 6,
              content:
                "Right now, there is no ability to add images while giving feedback which isn't _ideal because I have to use another app to show what I mean",
              user: {
                image: '../src/assets/user-images/image-javier.jpg',
                name: 'Javier Pollard',
                username: 'warlikeduke',
              },
            },
            {
              _id: 7,
              content:
                "Yes I'd like to see this as well. Sometimes I want to add a short v_ideo or gif to explain the site's behavior..",
              user: {
                image: '../src/assets/user-images/image-roxanne.jpg',
                name: 'Roxanne Travis',
                username: 'peppersprime32',
              },
            },
          ],
        },
        {
          _id: 5,
          title: 'Ability to follow others',
          category: 'feature',
          upvotes: 42,
          status: 'suggestion',
          description:
            'Stay updated on comments and solutions other people post.',
          comments: [
            {
              _id: 8,
              content:
                'I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?',
              user: {
                image: '../src/assets/user-images/image-victoria.jpg',
                name: 'Victoria Mejia',
                username: 'arlen_the_marlin',
              },
              replies: [
                {
                  content:
                    "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
                  replyingTo: 'arlen_the_marlin',
                  user: {
                    image: '../src/assets/user-images/image-zena.jpg',
                    name: 'Zena Kelley',
                    username: 'velvetround',
                  },
                },
              ],
            },
            {
              _id: 9,
              content:
                "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
              user: {
                image: '../src/assets/user-images/image-jackson.jpg',
                name: 'Jackson Barker',
                username: 'countryspirit',
              },
            },
          ],
        },
        {
          _id: 6,
          title: 'Preview images not loading',
          category: 'bug',
          upvotes: 3,
          status: 'suggestion',
          description:
            'Challenge preview images are missing when you apply a filter.',
        },
        {
          _id: 7,
          title: 'More comprehensive reports',
          category: 'feature',
          upvotes: 123,
          status: 'planned',
          description:
            'It would be great to see a more detailed breakdown of solutions.',
          comments: [
            {
              _id: 10,
              content:
                'This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.',
              user: {
                image: '../src/assets/user-images/image-victoria.jpg',
                name: 'Victoria Mejia',
                username: 'arlen_the_marlin',
              },
            },
            {
              _id: 11,
              content:
                "Yeah, this would be really good. I'd love to see deeper insights into my code!",
              user: {
                image: '../src/assets/user-images/image-jackson.jpg',
                name: 'Jackson Barker',
                username: 'countryspirit',
              },
            },
          ],
        },
        {
          _id: 8,
          title: 'Learning paths',
          category: 'feature',
          upvotes: 28,
          status: 'planned',
          description:
            'Sequenced projects for different goals to help people improve.',
          comments: [
            {
              _id: 12,
              content:
                "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
              user: {
                image: '../src/assets/user-images/image-george.jpg',
                name: 'George Partr_idge',
                username: 'soccerviewer8',
              },
            },
          ],
        },
        {
          _id: 9,
          title: 'One-click portfolio generation',
          category: 'feature',
          upvotes: 62,
          status: 'in-progress',
          description:
            'Add ability to create professional looking portfolio from profile.',
          comments: [
            {
              _id: 13,
              content:
                "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
              user: {
                image: '../src/assets/user-images/image-ryan.jpg',
                name: 'Ryan Welles',
                username: 'voyager.344',
              },
            },
          ],
        },
        {
          _id: 10,
          title: 'Bookmark challenges',
          category: 'feature',
          upvotes: 31,
          status: 'in-progress',
          description: 'Be able to bookmark challenges to take later on.',
          comments: [
            {
              _id: 14,
              content:
                "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
              user: {
                image: '../src/assets/user-images/image-suzanne.jpg',
                name: 'Suzanne Chang',
                username: 'upbeat1811',
              },
            },
          ],
        },
        {
          _id: 11,
          title: 'Animated solution screenshots',
          category: 'bug',
          upvotes: 9,
          status: 'in-progress',
          description:
            'Screenshots of solutions with animations don’t display correctly.',
        },
        {
          _id: 12,
          title: 'Add micro-interactions',
          category: 'enhancement',
          upvotes: 71,
          status: 'live',
          description: 'Small animations at specific points can add delight.',
          comments: [
            {
              _id: 15,
              content:
                "I'd love to see this! It always makes me so happy to see little details like these on websites.",
              user: {
                image: '../src/assets/user-images/image-victoria.jpg',
                name: 'Victoria Mejia',
                username: 'arlen_the_marlin',
              },
              replies: [
                {
                  content:
                    "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
                  replyingTo: 'arlen_the_marlin',
                  user: {
                    image: '../src/assets/user-images/image-suzanne.jpg',
                    name: 'Suzanne Chang',
                    username: 'upbeat1811',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(suggestions))
}
