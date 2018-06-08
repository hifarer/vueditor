
import Vue from 'vue'

const eventHubMap = {}

export default function (str) {
  if (!eventHubMap[str]) {
    eventHubMap[str] = new Vue()
  }
  return eventHubMap[str]
}
