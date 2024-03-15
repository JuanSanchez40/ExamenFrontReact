import React, { Component } from "react";
import EntradasService from "../services/entradas.service";
import "./board-admin.component.css";
import Save from "@mui/icons-material/Save";
import Clear from "@mui/icons-material/Clear";
import { Dialog, TextField } from "@mui/material/";
import Button from "@mui/material/Button";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddEntradas extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitulo = this.onChangeTitulo.bind(this);
    this.onChangeAutor = this.onChangeAutor.bind(this);
    this.onChangeFecha = this.onChangeFecha.bind(this);
    this.onChangeContenido = this.onChangeContenido.bind(this);

    this.saveEntrada = this.saveEntrada.bind(this);
    this.newEntrada = this.newEntrada.bind(this);

    this.state = {
      id: null,
      titulo: "",
      autor: "",
      fecha: moment(new Date()).format("YYYY-MM-DD"),
      contenido: "",
      disabledButtonFlag: true,

      submitted: false,
    };
  }

  onChangeTitulo(e) {
    this.setState({ titulo: e.target.value });
  }

  onChangeAutor(e) {
    this.setState({ autor: e.target.value });
  }

  onChangeFecha(e) {
    this.setState({ fecha: e });
  }

  onChangeContenido(e) {
    this.setState({ contenido: e.target.value });
  }

  saveEntrada = async () => {
    var data = {
      titulo: this.state.titulo,
      autor: this.state.autor,
      fecha: this.state.fecha,
      contenido: this.state.contenido,
    };
    console.log(data);

    await EntradasService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          titulo: response.data.titulo,
          autor: response.data.autor,
          fecha: response.data.fecha,
          contenido: response.data.contenido,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newEntrada() {
    this.setState({
      id: null,
      titulo: "",
      autor: "",
      fecha: moment(new Date()).format("YYYY-MM-DD"),
      contenido: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div
      >
        {this.state.submitted ? (
          <div>
            <h4>Se guardaron los datos correctamente!</h4>
            <button className="btn btn-success" onClick={this.newEntrada}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="selectContainer">
              <h4 style={{ marginLeft: "10px", marginBottom: "20px" }}>
                Agregar Entrada
              </h4>
              <div
                className="containerFields"
                style={{ marginLeft: "10px", marginBottom: "20px" }}
              >
                <div style={{ marginLeft: "10px", width: "100%" }}>
                  <TextField
                    className="textTitulo"
                    color="primary"
                    variant="outlined"
                    label="Título"
                    maxLength={3}
                    id="titulo"
                    required
                    value={this.state.titulo}
                    onChange={this.onChangeTitulo}
                    name="titulo"
                  />
                </div>

                <div
                  style={{ display: "flex", width: "60%", marginLeft: "10%" }}
                >
                  <div>
                    <label className="positionComponentDate" htmlFor="fecha">
                      Fecha:
                    </label>
                  </div>
                  <DatePicker
                    type="text"
                    className="form-control"
                    id="fecha"
                    required
                    value={this.state.fecha}
                    onChange={(newDate) =>
                      this.setState({
                        fecha: moment(newDate).format("YYYY-MM-DD"),
                      })
                    }
                    name="fecha"
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginLeft: "10px" }}>
                <div style={{ marginLeft: "10px", width: "100%" }}>
                  <TextField
                    className="textAutor"
                    color="primary"
                    variant="outlined"
                    label="Autor"
                    maxLength={3}
                    id="autor"
                    required
                    value={this.state.autor}
                    onChange={this.onChangeAutor}
                    name="autor"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginLeft: "20px" }}>
                <TextField
                  className="textArea"
                  color="primary"
                  variant="outlined"
                  label="Contenido"
                  multiline
                  required
                  rowsMax={5}
                  rows={5}
                  maxLength={3}
                  value={this.state.contenido}
                  onChange={this.onChangeContenido}
                />
              </div>
            </div>
            <div className="buttonsGuardar">
              <Button
                onClick={this.newEntrada}
                startIcon={<Clear />}
                size="large"
                variant="contained"
                color="warning"
              >
                Clear All
              </Button>
              <Button
                onClick={this.saveEntrada}
                startIcon={<Save />}
                size="large"
                variant="contained"
                color="success"
                style={{ marginLeft: "20px" }}
                disabled={
                  !this.state.titulo ||
                  !this.state.autor ||
                  !this.state.fecha ||
                  !this.state.contenido
                }
              >
                Guardar
              </Button>
            </div>
          </div>
        )}

        {this.state.modalBuscarFlag ? (
          <div>
            <Dialog
              style={{ marginTop: 50, height: "300px" }}
              open={this.state.modalBuscarFlag}
              onClose={this.handlCloseModalBuscar}
              fullWidth
              maxWidth="xl"
              scroll="disabled"
            >
              {<this.textoModal />}
            </Dialog>
          </div>
        ) : null}
      </div>
    );
  }
}
