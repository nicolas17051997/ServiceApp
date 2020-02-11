import { Guid } from "code/extensions";
import { ObservationTaskType } from "code/models/task/OdservationTaskType";

export class RegisterViewTable {

  constructor(
    public observationTaskId: number,
    public observationId: Guid,
    public observationDate: Date,
    public field: string,
    public fieldArea: number,
    public culture: string,
    public fieldVersionArea: number,
    public responsibleEmployeeName: string,
    public observationResultText: string,
    public startDate: Date,
    public endDate: Date,
    public createEmployeeName: string,
    public observationTaskText: string,
    public recommendedObservationCount: number,
    public observationTaskStatusName: string,
    public observationRiskLevel: number,
    public observationRiskLevelColor: string,
    public observationTypes: ObservationTaskType[],
    public hasFocus = false,
    public year: number,
    public sort: string,
    public isSelected: boolean = false,
    public cultureArea: number,
    public settlementName: string,
    public region: string,
    public measureShortName: string,
    public isDeleted: boolean
  ) {
  }
}
export class RegistersViewTable {
  public total: number;
  public pageIndex: number;
  public dataResult: RegisterViewTable[];
}
