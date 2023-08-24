import React, { useEffect, useMemo, useState } from 'react'
import tradesData from '../../services/TRADE_DATA.json'
import { format } from 'date-fns'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'

const BasicDataTable = () => {

    const demoData = []

    // const [data, setData] = useState([...demoData])

    // const data = []
    const data = useMemo(() => tradesData, [])

    // {
    //     "trade_id": 1000485941,
    //     "stock_symbol": "ULTRACEMCO",
    //     "stock_picture": "https://robohash.org/etadipisciodio.png?size=50x50&set=set1",
    //     "trade_date": "7/19/2017",
    //     "trade_time": 9,
    //     "trade_price": 5067.48,
    //     "trade_quantity": 333,
    //     "buyer_id": "6242",
    //     "seller_id": 1428,
    //     "buyer_email": "rdwire0@mozilla.org",
    //     "seller_email": "apearcy0@studiopress.com"
    // }

    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
        {
            header: 'Trade ID',
            accessorKey: 'trade_id',
            footer: 'Trade ID'
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
                format(new Date(info.getValue()), 'ko MMM yyyy') // using date-fns
            // DateTime.fromFormat(info.getValue(), 'M/d/yyyy').toFormat('LLL d, yyyy') // using luxon
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
            footer: 'Trade Price'
        },
        {
            header: 'Trade Quantity',
            accessorKey: 'trade_quantity',
            footer: 'Trade Quantity'
        },
        {
            header: 'Buyer ID',
            accessorKey: 'buyer_id',
            footer: 'Buyer ID'
        },
        {
            header: 'Seller ID',
            accessorKey: 'seller_id',
            footer: 'Seller ID'
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

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return (
        <>
            {/* <div className='m-5 p-5 bg-blue-500 text-white font-bold text-xl'>Basic Data Table</div> */}
            <div className="m-5 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                    <h2 className="font-bold capitalize text-xl text-slate-800">All Users of the System</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-bold uppercase text-black bg-yellow-300">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className='p-2 whitespace-nowrap'>
                                                <div className='font-bold text-center'>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, i) => (
                                        <tr key={row.id} className='lg:h-[72px] hover:bg-slate-100'>
                                            {row.getVisibleCells().map((cell) => (
                                                <td key={cell.id} className='p-2 whitespace-nowrap'>
                                                    <div className="text-center font-medium">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center font-semibold m-5">
                                        <td colSpan="11" className='p-2 whitespace-nowrap'>No Record Found!</td>
                                    </tr>
                                )}
                            </tbody>
                            {/* <tfoot>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='flex items-center justify-center gap-1'>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot> */}
                        </table>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button className='m-2 p-3 bg-amber-300'
                        onClick={() => table.setPageIndex(0)}>
                        <BiFirstPage className='text-2xl text-black' />
                    </button>
                    <button className={`${!table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''} m-2  p-3 bg-amber-300`}
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        <GrFormPrevious className='text-2xl text-black' />
                    </button>
                    <button className={`${!table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''} m-2  p-3 bg-amber-300`}
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        <GrFormNext className='text-2xl text-black' />
                    </button>
                    <button className='m-2 p-3 bg-amber-300' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                        <BiLastPage className='text-2xl text-black' />
                    </button>
                </div>
            </div>

        </>
    )
}

export default BasicDataTable
