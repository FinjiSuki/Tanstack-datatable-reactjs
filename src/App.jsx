import './App.css'
import tradesDataJson from '../services/TRADE_DATA.json'
import BasicDataTable from './components/BasicDataTable'
import { useMemo } from 'react'
// import { format } from 'date-fns'
import { DateTime } from 'luxon'
import { BiRupee } from 'react-icons/bi'

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

  return (
    <>
      <BasicDataTable tableTitle='nifty 50 securities transaction ledger' data={tradesData} columns={tradesDataColumns} bgColor='bg-[#CCF381]' txtColor='text-[#4831D4]' />
    </>
  )
}

export default App
