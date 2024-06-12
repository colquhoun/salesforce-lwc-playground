import { LightningElement, api } from 'lwc'

export default class DragListContainer extends LightningElement {
  @api items
  @api name
  cancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleDragComplete(event) {
    // Fire custom event when drag stops
    const detail = { name: this.name, id: event.target.dataset?.id }
    console.log(detail)
    this.dispatchEvent(
      new CustomEvent(
        'endmove', 
        { detail }
      )
    )
  }
  // Fire custom event whend drag starts
  handleDragStart(event) {
    const detail = { name: this.name, id: event.target.dataset?.id }
    this.dispatchEvent(
      new CustomEvent(
        'startmove', 
        { detail }
      )
    )
  }
}