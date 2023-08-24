import React, { useEffect, useMemo, useState } from 'react'
import tradesData from '../services/TRADE_DATA.json'
import { format } from 'date-fns'
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table'

const BasicDataTable = () => {

    const demoData = []

    // const [data, setData] = useState([...demoData])

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
                format(new Date(info.getValue()), 'ko MMM yyyy') // uisng date-fns
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
            <div className='flex justify-center items-center font-bold'>Basic Data Table</div>
            <div className='flex justify-center items-center'>
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='flex items-center justify-center gap-1'>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr key={row.id} className={`${i % 2 === 0 ? 'bg-gray-100' : ''} flex items-center justify-center`}>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id} className="px-3.5 py-2">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr className="text-center h-32">
                                <td colSpan={columns.length}>No Record Found!</td>
                            </tr>
                        )}
                        {/* {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))} */}
                    </tbody>
                    <tfoot>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className='flex items-center justify-center gap-1'>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>
            <div className='flex justify-center items-center'>
                <button className='mx-5 p-5 bg-blue-500 text-white font-mono' onClick={() => table.setPageIndex(0)}>First page</button>
                <button className={`${!table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''} mx-5 p-5 bg-blue-500 text-white font-mono`}
                    disabled={!table.getCanPreviousPage()}
                    onClick={() => table.previousPage()}
                >
                    <span className='p-5 bg-blue-500 text-white font-mono'>Previous page</span>
                </button>
                <button className='mx-5 p-5 bg-blue-500 text-white font-mono'
                    disabled={!table.getCanNextPage()}
                    onClick={() => table.nextPage()}
                >
                    Next page
                </button>
                <button className='mx-5 p-5 bg-blue-500 text-white font-mono' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                    Last page
                </button>
            </div>
            {/* <pre>{data}</pre> */}
        </>
    )
}

export default BasicDataTable
