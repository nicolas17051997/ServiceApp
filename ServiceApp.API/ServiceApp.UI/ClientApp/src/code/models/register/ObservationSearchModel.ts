import { CultureFieldversionSaveModel } from '..';
import { SelectedNodeViewModel } from '../task';
import { TreeFilter } from 'src/app/content/independent-component/field-tree/field-tree.component';

export class ObservationSearchModel {
  public selectedNodes: SelectedNodeViewModel[] = [];
  public treeFilter: TreeFilter;

  constructor(public pageIndex: number = 0,
    public pageSize: number = 10,
    public sort: string,
    public fields: string,
    public deleted: boolean,
    public date?: string,
    public dateFrom?: string,
    public dateTo?: string,
    public culture?: number,
    public year?: number,
    public responsibleId?: number,
    public pacificBlockId?: number,
    public taskTypeIds?: number[],
    public observationTaskStatusId?: number,
    public fieldVersionIds?: number[],
    public selectedObservationId?: string,
    public riskLevelOverall?: number,
    public creatorId?: number,
    public observerId?: number
  ) { }
}
