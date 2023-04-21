//import {ReactNode} from "react";

//properties of cards
declare interface PokerProps{
    value:number;
    type:number;
}

//properties of gamecontext
declare interface GameContextProps{
    userList?:Array<AdminProps>;
    //地主牌
    pokers?:Array<PokerProps>
    //地主
    start?:number;
    //上一副牌
    last?:PokerCombinationProps;
    //当前出牌对象
    user?:AdminProps;
    //房间号
    roomId:String;
    gameStatus:number;

    myUser?:AdminProps;
    leftUser?:AdminProps;
    rightUser?:AdminProps;

    //当前出牌编号
    now:number;
    winner?:number;

    code:string;
}

//properties of result
declare interface ResultProps<T> {
    status:number;
    data:T;
    msg:string;
}

//properties of card combination
declare interface PokerCombinationProps{
    userId:number;
    card:Array<PokerProps>;
}


//
declare interface AdminProps{
    id:number;
    name:string;
    verified:boolean;
    token:string;
    hasPassword?:boolean;

    handCard?:Array<PokerProps>;
    head?:string;
    //出牌状态 on 等待 off
    status:string;
    isContinue?:boolean;
}

declare interface ModalFormProps{
    fields:any;
    currentValue?:any;
    url:string;
    name:string;
    children:ReactNode;
    variant:string;
    allowDelete?:boolean;
}


declare interface StepsFormProps{
    fields:any;
    url:string;
    children:ReactNode;
    noRedirect?:boolean;
}