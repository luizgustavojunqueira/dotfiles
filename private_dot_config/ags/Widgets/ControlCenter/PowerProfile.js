import Widget from "resource:///com/github/Aylur/ags/widget.js";

import PowerProfileService from "../../Services/powerprofile.js";

import icons from "../../icons.js";

export const PowerProfile = () => {
  return Widget.Box({
    class_name: "power-profile-box",
    child: Widget.Button({
      class_name: PowerProfileService.bind("profile").as(
        (p) => `power-profile-button ${p}`,
      ),
      child: Widget.Box({
        vertical: false,
        children: [
          Widget.Icon({
            icon: PowerProfileService.bind("profile").as(
              (p) => icons.powerprofile[p],
            ),
          }),
          Widget.Label({
            label: PowerProfileService.bind("profile").as(
              (p) => ` ${p[0].toUpperCase()}${p.slice(1)}`,
            ),
          }),
        ],
      }),
      on_clicked: () => {
        PowerProfileService.nextProfile();
      },
    }),
  });
};
