import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getFilteredRowModel } from "@tanstack/react-table";

//* importamos la data
import data from "../data/data-table.json";
import { useState } from 'react';


const columns = [
  {
    header: "ID",
    accessorKey: 'id'
  },
  {
    header: "First Name",
    accessorKey: 'first_name'
  },
  {
    header: "Last Name",
    accessorKey: 'last_name'
  },
  {
    header: "Email",
    accessorKey: 'email'
  },
  {
    header: "Gender",
    accessorKey: 'gender'
  },
  {
    header: "Acciones",
    accessorKey: 'acciones',
    cell: info => {
      console.log();
      return (
        <>
          <button className="btn btn-outline-danger" style={ { marginRight: 5 } } onClick={ () => onDelete( info.row.original.id ) }>Eliminar</button>
          <button className="btn btn-outline-info">Editar</button>
        </>
      );
    }

  },
];

const onDelete = ( id ) => {
  console.log( id );
};


export const SimpleTable = () => {


  const [ filter, setFilter ] = useState( '' );


  const table = useReactTable( {
    data,
    columns,
    state: {
      globalFilter: filter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFilter
  } );



  return (
    <div className="container mt-5">
      <h2>Table con TanStack Table</h2>
      <div className="mb-3">
        <input
          className="form-control"
          type='text'
          value={ filter }
          onChange={ ( e ) => setFilter( e.target.value ) } placeholder='Buscar...' />
      </div>
      <table className="table table-bordered border-primary">
        <thead>
          {
            table.getHeaderGroups().map( ( headerGroup ) => (
              <tr key={ headerGroup.id }>
                {
                  headerGroup.headers.map( ( header ) => (
                    <td key={ header.id }>
                      { flexRender( header.column.columnDef.header, header.getContext() ) }
                    </td>
                  ) )
                }
              </tr>
            ) )
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map( ( row ) => (
              <tr key={ row.id }>
                {
                  row.getVisibleCells().map( ( cell ) => (
                    <td key={ cell.id }>
                      { flexRender( cell.column.columnDef.cell, cell.getContext() ) }
                    </td>
                  ) )
                }
              </tr>
            ) )
          }
        </tbody>
      </table>
      <button
        className="btn btn-outline-primary"
        disabled={ table.getState().pagination.pageIndex === 0 }
        onClick={ () => table.previousPage() }>
        Anterior
      </button>
      <span className='text text-dark'> Página: { table.getState().pagination.pageIndex + 1 } </span>
      <button
        className="btn btn-outline-primary"
        disabled={ table.getState().pagination.pageIndex + 1 === table.getPageCount() }
        onClick={ () => {
          table.nextPage();
        } }>
        Siguiente
      </button>
      <br />
      <span> Total de filas: { table.getPreFilteredRowModel().rows.length } </span>
    </div>
  );
};