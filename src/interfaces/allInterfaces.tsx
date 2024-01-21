export interface RegisterDebtProps {
    id?: string;
    name: string;
    number: string;
    criacao: string;
    debts: DebtsProps[];
}

export interface DebtsProps{
    id?: string;
    qtd: number;
    item: string;
    value: number;
    total: number;
    data: string;
}

export type AllDebts = RegisterDebtProps[]