import App from "resource:///com/github/Aylur/ags/app.js";
import ControlCenter from "./Windows/ControlCenter/ControlCenter.js";
import Bar from "./Windows/Bar.js";

App.config({
  style: "/home/luizg/.config/ags/styles/default.css",
  windows: [Bar(0), ControlCenter()],
  closeWindowDelay: {
    media: 350,
  },
});

App.applyCss("/home/luizg/.config/ags/styles/header.css");
