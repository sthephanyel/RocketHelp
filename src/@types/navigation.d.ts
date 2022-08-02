// Define a tipagem de rotas que podem ser usadas pelo useRoute
//sendo mais facil codar
export declare global {
    namespace ReactNavigation {
        interface RootParamList{
            home: undefined;
            new: undefined;
            details:{orderId: string};
        }
    }
}