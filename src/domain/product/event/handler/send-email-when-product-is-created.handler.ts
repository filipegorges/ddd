import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  handle(event: ProductCreatedEvent) {
    console.log(
      `SendEmailWhenProductIsCreatedHandler: ${JSON.stringify(event)}`
    );
  }
}
