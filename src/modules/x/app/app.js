import { LightningElement, track } from "lwc";
/* This is only a demo, not polished production code. It is trimmed to
  the bare minimum for educational purposes.

  Limitations:
  * If you do not drag on to a list item box, the item moves to index 0 on drop. 
  * If you drag a file into a droppable area, you'll get an error.
*/

export default class App extends LightningElement {
  availableItems = []
  selectedItems = []
  // Temp storage set on drag start
  dragInfo
  connectedCallback() {
    // Dummy data, so generated ID values
    this.availableItems = "a b c d e f g h i j k l".split(' ').map((value,id)=>({id:`${id}`,value}));
  }
  handleDragStart(event) {
    // Keep track of the list and item id
    this.dragInfo = { ...event.detail }
  }
  handleDragComplete(event) {
    // Keep reference to the lists. Start and end lists may be the same list.
    let startList = this.dragInfo.name === 'available'? this.availableItems: this.selectedItems
    let endList = event.detail.name === 'available'? this.availableItems: this.selectedItems
    // Indices for the items to move in their respective lists
    let startIndex = startList.findIndex(item => item.id === this.dragInfo.id)
    let endIndex = endList.findIndex(item => item.id === event.detail.id)
    // Remove from old index, move to new index
    endList.splice(endIndex, 0, startList.splice(startIndex, 1)[0])
    // Trigger a render cycle on copy. You could also use @track.
    this.availableItems = [...this.availableItems]
    this.selectedItems = [...this.selectedItems]
  }
}
