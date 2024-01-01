import React, { useContext, useEffect, useState } from 'react';
import { LiaRupeeSignSolid } from "react-icons/lia";
import Dashboard from '../Dashboard';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import UserStore from '../../../contexts/UserStore';
import { getTransactions } from '../../../apis/wallet';
import { Table } from "antd";
import PaymentForm from '../../../components/V3/Dashboard/Wallet/PaymentForm';
import WalletCard from '../../../components/Wallet/WalletCard';
import TransactionCard from '../../../components/Wallet/TransactionCard';
import { Avatar } from "@material-tailwind/react";
import pd_logo from '../../../assets/icons/pd_logo.png';

const WalletPage = () => {
    const {user} = useContext(UserStore);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recharge, setRecharge] = useState(false);
    const [totalSpent, setTotalSpent] = useState(0);

    const transactionInfo =  async(page = 1) => {
        setLoading(true);
        const res = await getTransactions(page);
        setTransactions(res);
        const calculateTotalSpent = res?.data?.reduce((acc, curr) => {
            if(curr.type==='debit'){
                acc = acc + curr.points;
            }
            return acc;
        },0);
        setTotalSpent(calculateTotalSpent);
        setLoading(false);
    };

    useEffect(() => {
        transactionInfo();
    },[]);

    const columns = [
        {
            title: 'User',
            dataIndex: "member",
            key:'member.name',
            render: member => {
                return(
                    <div className="flex items-center justify-start gap-2">
                        <Avatar
                            size="sm"
                            alt="avatar"
                            src={member?.photo ?? pd_logo}
                            className="border  shadow-green-900/20 ring-4 ring-white"
                        />
                       
                    </div>
                )
            }
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: 'date',
            render: date => {
                return (
                    <p>{new Date(date).toLocaleDateString('en-GB').replace(/\//g, '-')}</p>
                )
            },
            responsive: ['xs','sm','md','lg','xl','2xl']
        },
        // {
        //     title: "Time",
        //     dataIndex: "createdAt",
        //     key: 'date',
        //     render: date => {
        //         return (
        //             <p>{new Date(date).toLocaleTimeString('en-US', { hour12: true })}</p>
        //         )
        //     },
        //     responsive: ['xs','sm','md','lg','xl','2xl']
        // },
        {
            title: "Points",
            dataIndex: "points",
            key: "points",
            render: (points, record) => {
                return (
                    <p className={record.type === 'credit' ? 'text-green-500 font-semibold' 
                    : 'text-red-500 font-semibold'}>
                        {points}
                    </p>
                )
            },
            responsive: ['xs','sm','md','lg','xl','2xl']
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message",
            render: msg => <p className="text-sm">{msg}</p>,
            responsive: ['xs','sm','md','lg','xl','2xl']
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: status => {
                return (
                    <p className={`text-white p-2 rounded-md w-fit ${status === 'success' ? 'bg-green-600'
                : status === 'failed' ? 'bg-red-600' : 'bg-orange-600'}`}>{status}</p>
                )
            },
            responsive: ['xs','sm','md','lg','xl','2xl']
        },
    ];


    return (
        <Dashboard>
        <div className="w-full shadow-lg bg-white shadow-gray-300 p-4 lg:p-8 rounded-2xl h-fit flex flex-col gap-3 justify-start">
            <div className="flex gap-5 justify-between flex-col xl:flex-row items-center xl:items-start">
                 <WalletCard/>
                 <TransactionCard title={'Total Balance'} points={user?.wallet?.balance}/>
                 <TransactionCard title={'Total Spent'} points={totalSpent}/>
            </div>
             
             
             {
                !recharge ?
                <button className='text-white bg-brandRed bg-opacity-85 w-fit px-5 py-3 rounded-md flex gap-3 items-center font-semibold' onClick={()=>setRecharge(true)}>Recharge <LiaRupeeSignSolid size={20} color='white'/></button>
                :
                <PaymentForm setRecharge={setRecharge} transactionInfo={transactionInfo}/>
             }
             <div className="w-full h-full flex flex-col gap-3">
                <h4 className='text-lg'>Transaction Summary</h4>
                <div className="flex items-center">
                    <>
                        {
                            loading ?
                            (
                                <Skeleton count={5}/>
                            ):(
                                <div className="w-full overflow-x-scroll scroll-smooth">
                                    <Table
                                    columns={columns}
                                    dataSource={transactions?.data?.map((transaction) => ({
                                        ...transaction,
                                        key: transaction.id,
                                    }))}
                                    pagination={{
                                        total: transactions?.pagination?.total,
                                        current: transactions?.pagination?.current_page,
                                        onChange: (page) => {
                                            transactionInfo(page);
                                        }
                                    }}
                                
                                />
                                </div>
                            )
                        }
                    </>
                </div>
                
             </div>
        </div>
        </Dashboard>
    )
};

export default WalletPage;