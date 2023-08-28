import './App.css'
import tradesDataJson from '../services/TRADE_DATA.json'
import allUsers from '../services/USERS.json'
import BasicDataTable from './components/BasicDataTable'
import { useMemo } from 'react'
// import { format } from 'date-fns'
import { DateTime } from 'luxon'
import { BiRupee } from 'react-icons/bi'
import React from 'react'

function App() {

  const tradesData = useMemo(() => tradesDataJson, [])

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const tradesDataColumns = [
    {
      header: 'Trade ID',
      accessorKey: 'trade_id.$oid',
      footer: 'Trade ID',
      cell: info => <div className='overflow-hidden whitespace-nowrap text-ellipsis w-20' style={{ direction: 'rtl' }}>{info.getValue()}</div>
    },
    {
      header: 'Stock Symbol',
      accessorKey: 'stock_symbol',
      footer: 'Stock Symbol'
    },
    {
      header: 'Stock Picture',
      accessorKey: 'stock_picture',
      footer: 'Stock Picture',
      cell: info => <img src={info.getValue()} alt="Avatar" />
    },
    {
      header: 'Trade Date',
      accessorKey: 'trade_date',
      footer: 'Trade Date',
      cell: info =>
        // format(new Date(info.getValue()), 'ko MMM yyyy') // using date-fns --> Not working
        DateTime.fromFormat(info.getValue(), 'MM/dd/yyyy').toFormat('LLL d, yyyy') // using luxon
      // DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED), // using luxon
    },
    {
      header: 'Trade Time',
      accessorKey: 'trade_time',
      footer: 'Trade Time'
    },
    {
      header: 'Trade Price',
      accessorKey: 'trade_price',
      footer: 'Trade Price',
      cell: info => <div className='text-green-500 font-bold flex justify-end items-center'><BiRupee className='text-lg' />{info.getValue()}</div>
    },
    {
      header: 'Trade Qty',
      accessorKey: 'trade_quantity',
      footer: 'Trade Qty'
    },
    {
      header: 'Buyer ID',
      accessorKey: 'buyer_id.$oid',
      footer: 'Buyer ID',
      cell: info => <div className='overflow-hidden whitespace-nowrap text-ellipsis w-20' style={{ direction: 'rtl' }}>{info.getValue()}</div>
    },
    {
      header: 'Seller ID',
      accessorKey: 'seller_id.$oid',
      footer: 'Seller ID',
      cell: info => <div className='overflow-hidden whitespace-nowrap text-ellipsis w-20' style={{ direction: 'rtl' }}>{info.getValue()}</div>
    },
    {
      header: 'Buyer Email',
      accessorKey: 'buyer_email',
      footer: 'Buyer Email'
    },
    {
      header: 'Seller Email',
      accessorKey: 'seller_email',
      footer: 'Seller Email'
    }
  ]

  const usersData = useMemo(() => allUsers, [])

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const usersDataColumns = [
    {
      header: 'ID',
      accessorKey: '_id'
    },
    {
      header: 'User ID',
      accessorKey: 'userId'
    },
    {
      header: '.',
      accessorKey: 'profilePicture',
      cell: info => {
        return (
          info.getValue() ? (
            <img className="rounded-full" src={info.getValue()} width="40" height="40" alt="Avatar" />
          ) : (
            <svg className="h-10 w-10 text-blue-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
          )
        )

      }
    },
    {
      header: 'Name',
      accessorFn: row => `${row.firstName} ${row.lastName}`,
      cell: info => <div className='text-left'>{info.getValue()}</div>
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Gender',
      accessorKey: 'gender'
    },
    {
      header: 'D.O.B',
      accessorKey: 'dateOfBirth'
    },
    {
      header: 'Role',
      accessorKey: 'role'
    },
    {
      header: 'Mobile Number',
      accessorKey: 'mobileNumber'
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt'
    },
    {
      header: 'Updated At',
      accessorKey: 'updatedAt'
    }
  ]

  return (
    <>
      <BasicDataTable tableTitle='nifty 50 securities transaction ledger' data={tradesData} columns={tradesDataColumns} bgColor='bg-[#CCF381]' txtColor='text-[#4831D4]' />
      {/* <BasicDataTable tableTitle='all registered users log' data={usersData} columns={usersDataColumns} bgColor='bg-[#CCF381]' txtColor='text-[#4831D4]' /> */}
    </>
  )
}

export default App
