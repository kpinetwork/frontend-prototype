module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'code-smell', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
    'subject-case': [2, 'always', 'sentence-case'],
    'format-message': [2, 'always']
  },
  plugins: [
    {
      rules: {
        'format-message': ({ subject }) => {
          return [/^KPI-[0-9]+.*/.test(subject), 'Message should be -> [type]: KPI-[number] message']
        }
      }
    }
  ]
}
