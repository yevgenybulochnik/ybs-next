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
      expect(content[topic].articles).toHaveLength(2)
      expect(content[topic].projects).toHaveLength(2)
    })
    test(`${topic} article1 and project1 should properties file_name, file_path`, () => {
      const objKeys = [
        'file_name',
        'file_path',
        'data'
      ]

      const article1 = content[topic].articles[0]
      const project1 = content[topic].projects[0]

      expect(Object.keys(article1)).toEqual(objKeys)
      expect(Object.keys(project1)).toEqual(objKeys)

    })
  })

})
