import { PartLookUp } from "./part-lookup";
import { WorkOrder } from "./work-order";

export interface PartList {
    id?: number;
    part: PartLookUp;
    order: WorkOrder;
}