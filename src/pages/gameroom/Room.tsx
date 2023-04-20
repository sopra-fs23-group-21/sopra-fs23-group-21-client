import React, {useState} from 'react'
import { useParams} from 'react-router-dom'
import useLocalStorage from 'use-local-storage'
import {AdminProps, PokerProps} from "../../types";


export default function Room() {
    //当前登录的用户信息
    const [adminData] = useLocalStorage<AdminProps | undefined>('adminData', undefined)
    //房间号
    const { roomId } = useParams()
    //音乐地址
    const audioUrl = '/music/667.mp3';

    //上一副牌
    const [last,setLast] = useState<Array<PokerProps> | undefined >(undefined);
    const cardWidth = 122;
    const cardHeight = 180; // 设置牌的高度
    const cardOverlap = 50;
    const extraWidth = 40; // 增加的额外宽度
    const totalWidth = cardWidth + (last?.length || 1 - 1) * cardOverlap + extraWidth;
    //我的
    const [my,setMy] = useState(adminData);
    //left
    const [left,setLeft] = useState<AdminProps | undefined >(undefined);
    //right
    const [ right,setRight] = useState<AdminProps | undefined >(undefined);
    //游戏阶段
    const [roomStatus,setRoomStatus] = useState(0);
    //是否出牌
    const [isPay,setIsPay] = useState(false);
    //游戏结果
    const [result,setResult] = useState<string|undefined>();
    //地主牌
    const  [pokers,setPokers] = useState<Array<PokerProps> | undefined >(undefined);
    /**
     * 获取牌
     * @param card
     */
    const getCardImagePath = (card:PokerProps) => {
        if(card.value>13){
            return  `/image/${card.value}.png`
        }
        return `/image/${card.type}/${card.value}.png`;
    }
    /***
     * 排序
     * @param arr
     */
    const sortByValueAndType = (arr: PokerProps[]|undefined)=>{
        if(!arr){
            return arr;
        }
        return arr.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            } else if (a.value > b.value) {
                return 1;
            }
            if (a.type < b.type) {
                return -1;
            } else if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    }

}