import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Audio from "resource:///com/github/Aylur/ags/service/audio.js";

const getIcon = (type = "speaker", vol) => {
  if (type === "speaker") {
    let icon = [
      [101, "overamplified"],
      [67, "high"],
      [34, "medium"],
      [1, "low"],
      [0, "muted"],
    ].find(([threshold]) => threshold <= vol)?.[1];

    return `audio-volume-${icon}-symbolic`;
  } else if (type === "microphone") {
    let icon = [
      [70, "high"],
      [34, "medium"],
      [1, "low"],
      [0, "muted"],
    ].find(([threshold]) => threshold <= vol)?.[1];
    if (icon === "muted") {
      return "microphone-disabled-symbolic";
    }
    return `microphone-sensitivity-${icon}-symbolic`;
  }
};

const VolumeSlider = (type = "speaker") => {
  return Widget.Box({
    vertical: false,
    class_name: "volume-slider-box",
    children: [
      Widget.Button({
        class_name: "volume-button",
        on_clicked: () => {
          Audio[type].volume = Audio[type].is_muted ? 100 : 0;
          Audio[type].is_muted = !Audio[type].is_muted;
        },
        child: Widget.Icon().hook(Audio[type], (self) => {
          const vol = Audio[type].volume * 100;

          self.icon = String(getIcon(type, vol));
          self.tooltip_text = `Volume ${Math.floor(vol)}%`;
        }),
      }),
      Widget.Slider({
        hexpand: true,
        draw_value: false,
        on_change: ({ value, dragging }) => {
          if (dragging) {
            Audio[type].volume = value;
            Audio[type].is_muted = false;
          }
        },
        value: Audio[type].bind("volume"),
        class_name: Audio[type].bind("is_muted").as((m) => (m ? "muted" : "")),
      }),
    ],
  });
};

export const VolumeBox = () =>
  Widget.Box({
    class_name: "volume-box",
    vertical: true,
    children: [VolumeSlider("speaker"), VolumeSlider("microphone")],
  });
