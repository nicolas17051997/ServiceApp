import { Guid } from 'code/extensions';

export class ObservationTaskBindModel {
  constructor(public taskId: number, public observationId: Guid) {

  }
}
