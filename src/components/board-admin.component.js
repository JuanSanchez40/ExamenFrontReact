import React, { Component } from "react";
import PropTypes from "prop-types";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import "./board-admin.component.css";
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Dialog, TextField } from "@mui/material";
//import Button from "@mui/material/Button";
import Button from "@mui/material/Button";


import EntradasService from "../services/entradas.service";

export class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      singleFlag: false,
      topicFlag: false,
      topicTutoresFlag: false,
      content: "",
      name: "age",
      margenBoton: "",
      age: "",
      modalBuscarFlag: false,
      dialogoTitulo: "",
      dialogoMensaje: "",
      radioSelect: "alumno",
      alumnoCount: "",
      message: "",
      addAlumnoFlag: false,
      addTutorFlag: false,
      disabledEnviarButton: true,
      turno: "",
      textAreaValueMensaje: "",
      textAreaValueTitle: "",
      mensajeNotificacion: "",
      titleFlag: false,
      textMessage: false,
      dialogOn: false,
      addsomething: false,
      entradas: [],
      addEntrada: [],
      disabledButtonAgregar: true,
      estadoRow: null,
    };
  }

  componentDidMount = async () => {
    await UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
    this.retrieveEntradas();
  };

  retrieveEntradas() {
    EntradasService.getAll()
      .then((response) => {
        this.setState({
          entradas: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(this.state.entradas);
  }

  handleOpenModalBuscar = () => {
    this.setState({ modalBuscarFlag: true });
    this.setState({ addTutorFlag: false });
  };

  handlCloseModalBuscar = () => {
    this.setState({ modalBuscarFlag: false });
  };

  textoModal = () => {
    const titulo = this.state.addEntrada.slice(1, 2);
    const autor = this.state.addEntrada.slice(2, 3);
    const fecha = this.state.addEntrada.slice(3, 4);
    const contenido = this.state.addEntrada.slice(4, 5);

    return (
      <div
        className="backgroundModal"
        id="background"
        style={{ height: "400px" }}
      >
        <div className="selectContainerModal">
          <div style={{ marginLeft: "05%", width: "90%" }}>
            <h4 style={{ marginBottom: "20px" }}>Alumno</h4>
            <div>
              <label style={{ marginBottom: "05px" }}>
                <strong>Título:</strong>
              </label>{" "}
              {titulo}
            </div>
            <div>
              <label style={{ marginBottom: "05px" }}>
                <strong>Autor:</strong>
              </label>{" "}
              {autor}
            </div>
            <div>
              <label style={{ marginBottom: "05px" }}>
                <strong>Fecha:</strong>
              </label>{" "}
              {fecha}
            </div>
            <div >
              <label style={{ marginBottom: "05px" }}>
                <strong>Contenido:</strong>
              </label>{" "}
              {contenido}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const contenido = this.state.content;
    const modalBuscar = this.state.modalBuscarFlag;
    const { entradas } = this.state;
  
    const columns = [
      "id",
      {
        name: "titulo",
        label: "Título",
        options: { filterOptions: { fullWidth: true } },
      },
      { name: "autor", label: "Autor" },
      { name: "fecha", label: "Fecha" },
      { name: "contenido",
        label: "Contenido",
        options: {
          sort: true,

          customBodyRender: (value, tableMeta, updateValue) => {  
            
            return (            
                <TextField required defaultValue={value} 
                  variant="standard" 
                  onChange={event => updateValue(event.target.value)}
                  InputProps={{
                      readOnly: true,
                      maxlength: 70,
                      disableUnderline: true, 
                      
                  }}
                  fullWidth
                  maxlength={70}
                  multiline
                  rowsMax={4}
                  rows={4}
                  sx={{
                    "& .MuiInputBase-input": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }
                  }}
                />
            )
        }
        },
      },
    ];

    const muiCache = createCache({
      key: "mui-datatables",
      prepend: true,
    });

    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      selectableRowsOnClick: true,
      selectableRows: "single",
      setRowProps: (rowData, rowState) => ({
        onMouseUp: () => {
          this.setState({ estadoRow: rowState });
          if (rowState === this.state.estadoRow) {
            this.setState({ disabledButtonAgregar: true });
            this.setState({ estadoRow: null });
          } else {
            this.setState({ disabledButtonAgregar: false });
          }
          const dataName = rowData.map((item, index) => {
            return item;
          });

          const mySelectedName = dataName;
          console.log(mySelectedName);
          console.log(mySelectedName.slice(1, 2));

          const nombre = mySelectedName.slice(1, 2);
          const entradaData = mySelectedName;
          this.setState({ lastClicked: nombre });
          this.setState({ addEntrada: entradaData });
        },
      }),
    };

    return (
      <div className="container">
        {contenido === "No token provided!" ? (
          <header className="jumbotron">
            <h3>{this.state.content}</h3>
          </header>
        ) : (
          <div className="selectContainer">
            <div style={{ marginLeft: "10px", marginBottom: "30px" }}>
              <h4>Listado de entradas</h4>
            </div>
            <div className="form-group">
              <div style={{ marginLeft: "10px" }}>
                <Button
                  href="/addEntradas"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Nueva entrada
                </Button>
              </div>
              <CacheProvider value={muiCache}>
                <ThemeProvider theme={createTheme()}>
                  <div
                    style={{ marginLeft: "20px", marginTop: 30, margin: 20 }}
                  >
                    <div className="entrada">
                      Entrada Seleccionada:{" "}
                      <span className="entradaName">
                        {this.state.lastClicked}{" "}
                      </span>
                    </div>
                    <div
                      style={{
                        justifyContent: "flex-end",
                        marginTop: "-30px",
                        marginLeft: "89%",
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={this.handleOpenModalBuscar}
                        size="large"
                        disabled={this.state.disabledButtonAgregar}
                        color="primary"
                      >
                        Agregar
                      </Button>
                    </div>
                  </div>

                  <MUIDataTable
                    title={"Entradas"}
                    data={entradas}
                    columns={columns}
                    options={options}
                  />
                </ThemeProvider>
              </CacheProvider>

              <div>
                <Dialog
                  style={{ marginTop: 50, height: "300px" }}
                  open={modalBuscar}
                  onClose={this.handlCloseModalBuscar}
                  fullWidth
                  maxWidth="xl"
                  scroll="disabled"
                >
                  {<this.textoModal />}
                </Dialog>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

BoardAdmin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default BoardAdmin;
