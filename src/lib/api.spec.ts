import {
  walk,
  genContentObj,
} from './api'

test('Given a dir path, output all files recursively', () => {
  expect(walk('src/lib/testcontent')).toHaveLength(8)
})

describe('Given a content dir, return content obj', () => {
  const content = genContentObj('src/lib/testcontent')
  const topics =  ['topic1', 'topic2']

  test('should have topic1, and topic2', () => {
    expect(Object.keys(content)).toEqual(['topic1', 'topic2'])
  })

  topics.forEach((topic) => {
    test(`${topic} should have 2 articles and 2 projects`, () => {
      expect(content[topic].articles).toEqual(['article1', 'article2' ])
      expect(content[topic].projects).toEqual(['project1', 'project2'])
    })
  })

})
