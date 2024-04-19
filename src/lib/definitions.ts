export interface List {
id: string;
created_at?: string;
title: string;
}

export interface ListItem {
id: number;
created_at: string;
name: string;
purchased: boolean;
extra_info: string;
list_id: number;
}
    