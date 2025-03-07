import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DatagridCustom from '../componentes/DatagridCustom';
import { Button } from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Formulario from '../componentes/Formulario';
import { useState } from 'react';

export default function Maquinas() {
    let pageSiz = 10;
    let pageSizeOpt = [5, 10, 20];
    let initalValues = {};
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleEditSubmit = (formData) => {
        console.log("Datos del formulario de editar enviados:", formData);
    };

    const camposEdit = [
        { name: "codigo", label: "Codigo de Maquina", type: "text", required: true, disabled: true, id: "outlined-basic", valorDefault: "" },
        { name: "nombre", label: "Nombre", type: "text", required: true, disabled: false, id: "outlined-basic",valorDefault: "" },
        { name: "marca", label: "Marca", type: "text", required: true, disabled: false, id: "outlined-basic", valorDefault: "" },
        { name: "estado", label: "Estado", type: "text", required: true, disabled: false, id: "outlined-basic", valorDefault: "" },
        { name: "descripcion", label: "Descripcion", type: "textarea", required: true, disabled: false, id: "outlined-basic", valorDefault: "" },
    ];

    function renderEdit(params) {
        if (!params.row) return null;
        return (
            <Button onClick={() => {
                setSelectedRow(params.row); // Guarda la fila seleccionada
                setDialogOpen(true); // Abre el diálogo
                
            }}>
                <EditRoundedIcon />
            </Button>
        );
    }


    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1.5, minWidth: 200 },
        {
            field: 'estado',
            headerName: 'Estado',
            flex: 0.5,
            minWidth: 80
        },
        {
            field: 'codigo',
            headerName: 'Codigo de Maquina',
            headerAlign: 'right',
            align: 'right',
            flex: 1,
            minWidth: 80,
        },
        {
            field: 'action',
            headerName: '',
            headerAlign: 'right',
            align: 'right',
            flex: 1,
            minWidth: 100,
            sortable: false, //  Desactiva el ordenamiento en esta columna
            filterable: false, //  Desactiva los filtros en esta columna
            disableColumnMenu: true, //  Oculta el menú de opciones en esta columna
            disableClickEventBubbling: true, // Evita que el checkbox se active
            renderCell: (params) => renderEdit(params),
        },
    ];

    //+(selectedRow ? selectedRow[codigo] : "")


    return (
        <>
            <DatagridCustom rows={rows}
                columns={columns}
                pageSiz={pageSiz}
                pageSizeOpt={pageSizeOpt}
            />
            <Formulario open={dialogOpen} setOpen={setDialogOpen}
                config={{
                    title: "Editar Maquina",
                    titleButton: "Editar",
                    description: "Editar información de la maquina seleccionada: "+(selectedRow ? selectedRow["codigo"] : ""),
                    submitFunc: handleEditSubmit,
                    initialValues: {
                        codigo: selectedRow ? selectedRow["codigo"] || "" : "",
                        nombre: selectedRow ? selectedRow["nombre"] || "" : "",
                        marca: selectedRow ? selectedRow["marca"] || "" : "",
                        estado: selectedRow ? selectedRow["estado"] || "" : "",
                        descripcion: selectedRow ? selectedRow["descripcion"] || "" : ""
                    },
                    fields: camposEdit.map((item) => ({
                        ...item, // Copia todas las propiedades originales
                        valorDefault: selectedRow ? selectedRow[item.name] || "" : "" // Establece el valor correcto
                    }))
                }}
            />
        </>
    );
}



export const rows = [
    {
        id: 1,
        nombre: 'Maquina 1',
        estado: 'Online',
        codigo: 212421,
        action: 1
    },
    {
        id: 2,
        nombre: 'Maquina 2',
        estado: 'Online',
        codigo: 212422,
        action: 2
    },
    {
        id: 3,
        nombre: 'Maquina 3',
        estado: 'Online',
        codigo: 212423,
        action: 3
    },
    {
        id: 4,
        nombre: 'Maquina 4',
        estado: 'Online',
        codigo: 212424,
        action: 4
    },
    {
        id: 5,
        nombre: 'Maquina 5',
        estado: 'Online',
        codigo: 212425,
        action: 5
    },
    {
        id: 6,
        nombre: 'Maquina 6',
        estado: 'Online',
        codigo: 212426,
        action: 6
    },
    {
        id: 7,
        nombre: 'Maquina 7',
        estado: 'Online',
        codigo: 212427,
        action: 7
    },
    {
        id: 8,
        nombre: 'Maquina 8',
        estado: 'Online',
        codigo: 212428,
        action: 8
    },
    {
        id: 9,
        nombre: 'Maquina 9',
        estado: 'Online',
        codigo: 212429,
        action: 9
    },
    {
        id: 10,
        nombre: 'Maquina 10',
        estado: 'Online',
        codigo: 212430,
        action: 10
    },
    {
        id: 11,
        nombre: 'Maquina 11',
        estado: 'Online',
        codigo: 212431,
        action: 11
    },
    {
        id: 12,
        nombre: 'Maquina 12',
        estado: 'Online',
        codigo: 212432,
        action: 12
    },
    {
        id: 13,
        nombre: 'Maquina 13',
        estado: 'Online',
        codigo: 212433,
        action: 13
    },
    {
        id: 14,
        nombre: 'Maquina 14',
        estado: 'Online',
        codigo: 212434,
        action: 14
    },
    {
        id: 15,
        nombre: 'Maquina 15',
        estado: 'Online',
        codigo: 212435,
        action: 15
    },
];
