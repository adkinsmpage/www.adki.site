import {matter} from 'vfile-matter'

export default function myUnifiedPluginHandlingYamlMatter() {
  return function (_tree, file) {
    matter(file)
  }
}