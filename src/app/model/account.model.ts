export interface AccountOperationDTO {
    id:            number;
    operationDate: Date;
    amount:        number;
    type:          string;
}
export interface AccountDetails {
    accountId:           string;
    balance:             number;
    totalPages:          number;
    currentPage:         number;
    pageSize:            number;
    accountOperationDTO: AccountOperationDTO[];
}
