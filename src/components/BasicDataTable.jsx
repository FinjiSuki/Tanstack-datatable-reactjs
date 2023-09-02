import React, { useState } from 'react'
import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import { flexRender, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'

const BasicDataTable = ({ tableTitle, data, columns, bgColor, txtColor }) => {

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering
    })

    return (
        <>
            <div className="m-3 bg-white shadow-lg rounded-sm border border-slate-200">
                <header className="px-5 py-4 border-b border-slate-100">
                    <h2 className="font-bold capitalize text-xl text-slate-800">{tableTitle}</h2>
                </header>
                <div className="p-3">
                    <div className='flex justify-end items-center flex-col sm:flex-row mb-3 gap-2'>
                        <label htmlFor="searchBox" className='font-bold'>Search: </label>
                        <input
                            type="text"
                            name="searchBox"
                            id="searchBox"
                            autoComplete="searchBox"
                            value={filtering}
                            onChange={(e) => setFiltering(e.target.value)}
                            className={`rounded-md border-2 px-3.5 py-2 text-black shadow-sm ring-2 ring-inset ring-color6 focus:ring-color2 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className={`text-xs font-bold uppercase ${bgColor} ${txtColor}`}>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} className='p-2 whitespace-nowrap' onClick={header.column.getToggleSortingHandler()}>
                                                <div className='font-bold text-center'>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {
                                                        { asc: ' 🔼', desc: ' 🔽' }
                                                        [
                                                        header.column.getIsSorted() ?? null
                                                        ]
                                                    }
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-100">
                                {table.getRowModel().rows.length ? (
                                    table.getRowModel().rows.map((row, i) => (
                                        <tr key={row.id} className='h-[72px] hover:bg-slate-100'>
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
                <div className='flex justify-between items-center flex-col md:flex-row m-5'>
                    <div className='flex justify-center items-center gap-1'>
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{' '}
                                {table.getPageCount()} {' '}
                            </strong>
                        </span>
                        <span>|</span>
                        <span className="flex items-center gap-1">
                            Go to page:
                            <input
                                type="number"
                                defaultValue={table.getState().pagination.pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    table.setPageIndex(page)
                                }}
                                className={`block w-16 rounded-md border-2 p-1 pl-2 text-black shadow-sm ring-2 ring-inset ring-color6 focus:ring-color2 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6`}
                            />
                        </span>
                    </div>
                    <div className='flex justify-center items-center'>
                        <button className={`m-2 p-3 ${bgColor}`}
                            onClick={() => table.setPageIndex(0)}>
                            <BiFirstPage className={`text-2xl ${txtColor}`} />
                        </button>
                        <button className={`${!table.getCanPreviousPage() ? 'opacity-50 cursor-not-allowed' : ''} m-2  p-3 ${bgColor}`}
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                        >
                            <MdOutlineArrowBackIos className={`text-xl ${txtColor}`} />
                        </button>
                        <button className={`${!table.getCanNextPage() ? 'opacity-50 cursor-not-allowed' : ''} m-2  p-3 ${bgColor}`}
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                        >
                            <MdOutlineArrowForwardIos className={`text-xl ${txtColor}`} />
                        </button>
                        <button className={`m-2 p-3 ${bgColor}`} onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                            <BiLastPage className={`text-2xl ${txtColor}`} />
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className="block w-full rounded-md border-2 p-2 text-black shadow-sm ring-2 ring-inset ring-color6 focus:ring-color2 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        {/* <div>{table.getRowModel().rows.length} Rows</div> */}
                    </div>
                </div>
            </div >

        </>
    )
}

export default BasicDataTable
