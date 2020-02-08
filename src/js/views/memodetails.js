import React, { useState, useContext, useEffect } from "react";

import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Temas } from "../component/temas.js";
import { Collapse } from "../component/collapseTopics.js";
import "../../styles/home.scss";
import { Context } from "../store/appContext";

export const MemoDetails = props => {
	const { store, actions } = useContext(Context);

	const [state, setState] = useState({
		id: 1,
		user_id: 1,
		admin: "Luis Reyes",
		create_date: "01-01-2020",
		meeting_date: "23-03-2020",
		meeting_hour: "14:30 pm",
		project_name: "Proyecto1",
		title: "Reunion RRHH",
		topics: [
			{
				id: 1,
				meeting_id: 1,
				title: "Tema1",
				priority: "",
				index: 1,
				matter: "Revisión area comercial",
				notes: "",
				tracking: "",
				duration: 30
			},
			{
				id: 2,
				meeting_id: 1,
				title: "Tema2",
				priority: "",
				index: 2,
				matter: "Revisión área financiera",
				notes: "",
				tracking: "",
				duration: 45
			}
		],
		guest_names: ["Roman", "Julian", "Veronica"],
		guest_emails: ["roman@gmail.com", "julian@gmail.com", "vero@gmail.com"],
		guest_roles: ["reemplazo", "coordinador", "oyente"],
		place: "Sala Reuniones",
		description: "Revisión sueldos empleados planta Quilicura",
		target: "Reajuste Sueldos"
	});

	const [time, setTime] = useState(0);

	// function getFetch{
	// 	url => {
	// 		fetch(url)
	// 			.then(resp => resp.json())
	// 			.then(data => setState({ data }));
	// 	}
	// }

	useEffect(() => {
		// 	getFetch("#" + props.match.params.id);

		let sum_time = 0;
		if (!!state.topics) {
			state.topics.forEach(item => {
				//CONDICIONAR EL forEach AL CURRENT USER y AL CURRENT MEETING
				sum_time += item.duration;
			});
			setTime(sum_time);
		}
	}, []);

	// REVISAR TODAS LAS FUNCIONES A CONTINUACIÓN Y LAS DEL ACTIONS

	function onUpdate(e, name) {
		const data = Object.assign({}, state);
		data[name] = e.target.value;
		setState(data);
	}

	function onCreateTopic(data) {
		//const data = Object.assign({}, state.topics);
		setState((state.topics = state.topics.push(data)));
	}

	function onUpdateTopic(id, e, name) {
		const index = state.topics.findIndex((item, i) => {
			return item.id == id;
		});

		const data = Object.assign({}, state.topics[index]);
		data[name] = e.target.value;
		setState(data);
	}

	function onDeleteTopic(id) {
		const index = state.topics.findIndex((item, i) => {
			return item.id == id;
		});

		const topics_copy = state.topics.slice();
		topics_copy.splice(index, 1);
		setState((state.topics = topics_copy));
	}

	return (
		<>
			<div className="container" style={{ padding: "0px" }}>
				<div className="row" style={{ margin: "0px" }}>
					<div className="col-6" style={{ padding: "0px" }}>
						<h1>Minuta Reunión</h1>
						<form>
							<div className="form-group row" style={{ marginTop: "20px" }}>
								<label htmlFor="inputProject" className="col-sm-4 col-form-label">
									Nombre Proyecto:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "project_name")}
										className="form-control"
										value={state.project_name}
										placeholder="Proyecto"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputTitle" className="col-sm-4 col-form-label">
									Título Reunión:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "title")}
										className="form-control"
										value={state.title}
										placeholder="Título"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputMeeting_date" className="col-sm-4 col-form-label">
									Fecha:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "meeting_date")}
										className="form-control"
										value={state.meeting_date}
										placeholder="Fecha"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputMetting_hour" className="col-sm-4 col-form-label">
									Hora:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "meeting_hour")}
										className="form-control"
										value={state.meeting_hour}
										placeholder="Fecha"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputPlace" className="col-sm-4 col-form-label">
									Lugar:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "place")}
										className="form-control"
										value={state.place}
										placeholder="Lugar"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputAdmin" className="col-sm-4 col-form-label">
									Citación hecha por:
								</label>
								<div className="col-sm-8">
									<input
										type="text"
										onChange={e => onUpdate(e, "admin")}
										className="form-control"
										value={state.admin}
										placeholder="Nombre Citador"
									/>
								</div>
							</div>
						</form>
					</div>
					{/* PROGRAMAR START Y PAUSE */}
					<div className="col-6" style={{ padding: "0px" }}>
						<div className="d-block d-flex justify-content-center mt-5 pt-5">
							<h2>Tiempo restante:</h2>
						</div>
						<div className="d-block d-flex justify-content-center">
							<h1>
								<Countdown
									id="meeting_counter"
									date={Date.now() + time * 60 * 1000}
									autoStart={false}
									onPause={() => {
										return alert("La reunión se ha pausado");
									}}
									OnComplete={() => {
										return alert(
											"La reunión se ha terminado, Muchas gracias por su asistencia. Hasta la Próxima !"
										);
									}}
								/>
							</h1>

							{/* <img className="d-flex justify-content-lg-center" />
							<button className="btn btn-primary" type="button" onClick={() => } style={{ margin: "5px" }}>
								Comenzar
							</button>
							<button className="btn btn-danger" type="button" onClick={() => }>
								Pausar
							</button> */}
						</div>
					</div>
				</div>
			</div>

			<div className="container" style={{ padding: "0px" }}>
				<div className="row" style={{ margin: "0px", marginTop: "20px" }}>
					<div className="col">
						<h4 className="justify-content-center align-content-center">Participantes</h4>
						<ul className="list-group">
							{!!state.guest_names &&
								state.guest_names.map((item, i) => {
									return (
										<li className="list-group-item" key={i}>
											<span>{item}</span>
										</li>
									);
								})}
						</ul>
					</div>
					<div className="col">
						<h4>Correos</h4>
						<ul className="list-group">
							{!!state.guest_emails &&
								state.guest_emails.map((item, i) => {
									return (
										<li className="list-group-item" key={i}>
											<span>{item}</span>
										</li>
									);
								})}
						</ul>
					</div>
					<div className="col">
						<h4>Roles</h4>
						<ul className="list-group">
							{!!state.guest_roles &&
								state.guest_roles.map((item, i) => {
									return (
										<li className="list-group-item" key={i}>
											<span>{item}</span>
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			</div>

			<div className="container" style={{ padding: "5px" }}>
				<div className="row" style={{ margin: "0px", marginTop: "30px" }}>
					<div className="col-12" style={{ paddingRight: "5px", paddingLeft: "5px" }}>
						<form>
							<div className="form-group row">
								<label htmlFor="inputDescription" className="col-sm-2 col-form-label">
									Descripción:
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										onChange={e => onUpdate(e, "description")}
										className="form-control"
										value={state.description}
										placeholder="Descripcion"
									/>
								</div>
							</div>
							<div className="form-group row">
								<label htmlFor="inputTarget" className="col-sm-2 col-form-label">
									Objetivo:
								</label>
								<div className="col-sm-10">
									<input
										type="text"
										onChange={e => onUpdate(e, "target")}
										className="form-control"
										value={state.target}
										placeholder="Objetivo"
									/>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="container" style={{ padding: "5px" }}>
				<h4>Revisión de Temas:</h4>
				<div className="row" style={{ margin: "0px", marginTop: "20px" }}>
					<div className="col">
						{state.topics.map((item, i) => {
							return (
								<Temas
									id={item.id}
									meeting_topic={item}
									key={i}
									index={i}
									update={onUpdateTopic}
									delete={onDeleteTopic}
								/>
							);
						})}
					</div>
				</div>
				<div className="row" style={{ margin: "0px" }}>
					<div className="col">
						<Collapse metting_id={state.topics.meeting_id} create={onCreateTopic} delete={onDeleteTopic} />
					</div>
				</div>
			</div>

			<div className="row" style={{ margin: "0px", marginLeft: "0px", marginTop: "20px" }}>
				<div className="col d-flex justify-content-center">
					<Link className="btn btn-danger mt-3" to="/principal">
						Volver
					</Link>
					<Link className="" to="/principal">
						<button
							className="btn btn-success mt-3"
							//onClick={() => save(state, props.index)}
							type="button"
							onClick={() => actions.onUpdate(state)}
							style={{ marginLeft: "10px" }}>
							Guardar
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

MemoDetails.propTypes = {
	match: PropTypes.object
};
