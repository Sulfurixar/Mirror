import { useState, useEffect } from "react";

//components
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.js";

var addrs = window.location.hostname;

function NewsSwitch({ token }) {
	let [news, setNews] = useState(false);

	var fetch_data = (jsondata) => {
		fetch("http://" + addrs + ":8080/conf", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(jsondata)
		})
			.then((response) => response.json())
			.then((data) => setNews(Boolean(data.status)));
	};

	const onNewsChange = (checked) => {
		fetch_data({ token: token, set: { name: "errnews", value: checked ? 1 : 0 } });
	};

	useEffect(() => {
		fetch_data({ token: token, status: "errnews" });
	});

	return (
		<div>
			<ToggleSwitch id="news-switch" checked={news} onChange={onNewsChange} small={true} />
			<label htmlFor="news-switch">Toggle news</label>
		</div>
	);
}

export default NewsSwitch;
