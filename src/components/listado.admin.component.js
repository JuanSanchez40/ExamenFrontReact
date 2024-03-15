import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import './board-admin.component.css';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import AlumnosService from "../services/entradas.service";


export default class ListadoAdmin extends Component {
  constructor(props) {
    super(props);
  
    this.retrieveAlumnos = this.retrieveAlumnos.bind(this);
   

    this.state = {
      lastClicked: "",
      alumnos: [],
      addAlumno: [],
    };
  }

  componentDidMount() {
    this.retrieveAlumnos();
  }

  retrieveAlumnos() {
    AlumnosService.getAll()
      .then(response => {
        this.setState({
          alumnos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  sendData = () => {
    
    this.props.parentCallback(this.state.addAlumno);
    
  }

  render() {
  const { alumnos }= this.state
  console.log(alumnos);
  const columns = [
    "id",
    {  name: "alumno", label:"Nombre", options: { filterOptions: { fullWidth: true } } },
    {  name:"cuenta", label: "Cuenta"},
    {  name: "padrefamilia", label: "Tutor"},
    {  name: "tokenmovil", label: "Token Movil"},
    {  name: "grado", label: "Grado"},
    {  name: "grupo", label: "Grupo"},
    {  name: "turno", label: "Turno"},
    {  name: "promedio", label: "Promedio"},
    {  name: "reprobadas", label: "Reprobadas"},
    {  name: "fasedeedoneae", label: "NEAE"},
    {  name: "imagen"}
  ];

  const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
  });

  const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      // onCellClick: (_, { rowIndex }) => {
        
      //   this.setState({ lastClicked: data[rowIndex][1] });
      // },
      selectableRowsOnClick: true,
      selectableRows: 'single',
      onRowClick: () => {  
        console.log("click!");
     },
     setRowProps: (rowData, rowState) => ({
  
      onMouseUp: () => {
       
         //console.log(rowData, rowState);
         console.log("mouse up!");
  
        const dataName = rowData.map((item, index) => {
          return item;
        });
      
        const mySelectedName = dataName;        
        console.log(mySelectedName);
        console.log(mySelectedName.slice(1,2));

        const nombre = mySelectedName.slice(1,2);
        const alumnoData = mySelectedName;
        this.setState({ lastClicked: nombre });
        this.setState({ addAlumno: alumnoData });
        
      }
     })
  };

  return (
    
    
  <CacheProvider   value={muiCache} > 
      <ThemeProvider   theme={createTheme()}>
            <div style={{ marginLeft: '20px', marginTop: 30,  margin: 20 }}>
            <div className="alumno"  >
              Alumno: <span className="alumnoName">{this.state.lastClicked} </span>     
            </div> 
            <div  style={{ justifyContent: "flex-end",  marginTop: '-30px', marginLeft: '89%' }}>
              <Button
             
              startIcon={<PersonIcon />}
              variant="contained" 
              onClick={this.sendData}
              size="large"
              disabled={false}
              color="primary"
              >                  
              Agregar
              </Button>
              </div> 
            
            </div> 
          
        <MUIDataTable 
          title={"Listado Preparatoria CU"}
          data={alumnos}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
  </CacheProvider>
  );
  }
}


