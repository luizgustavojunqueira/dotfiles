import Brightness from "../../Services/brightness.js";
import Widget from "resource:///com/github/Aylur/ags/widget.js";

const BrightnessSlider = () =>
  Widget.Slider({
    draw_value: false,
    hexpand: true,
    value: Brightness.bind("screen"),
    on_change: ({ value }) => (Brightness.screen = value),
  });

export const BrightnessBox = () => {
  return Widget.Box({
    class_name: "brightness-box",
    children: [
      Widget.Button({
        class_name: "brightness-button",
        child: Widget.Icon("display-brightness-symbolic"),
        tooltipText: Brightness.bind("screen").as(
          (v) => `Screen Brightness: ${Math.floor(v * 100)}%`,
        ),
      }),
      BrightnessSlider(),
    ],
  });
};
