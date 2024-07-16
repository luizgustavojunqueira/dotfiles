import App from "resource:///com/github/Aylur/ags/app.js";
import ControlCenter from "./Windows/ControlCenter.js";
import Bar from "./Windows/Bar.js";

App.config({
  style: "/home/luizg/.config/ags/styles/default.css",
  windows: [
    Bar(0),
    ControlCenter(),
    //   Bar(1)
  ],
  closeWindowDelay: {
    media: 350,
  },
});
