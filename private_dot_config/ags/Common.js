export const opened = Variable("");

App.connect("window-toggled", (_, name, visible) => {
  if (name === "control-center" && !visible) {
    Utils.timeout(500, () => (opened.value = ""));
  }
});

export const ArrowToggleButton = ({
  name,
  icon,
  label,
  activate,
  deactivate,
  activateOnArrow = true,
  connection: [service, condition],
}) =>
  Widget.Box({
    class_name: "toggle-button",
    children: [
      Widget.Button({
        child: Widget.Box({
          hexpand: true,
          class_name: "label-box horizontal",
          children: [icon, label],
        }),
        on_secondary_click: () => {
          if (condition()) {
            deactivate();
            if (opened.value === name) opened.value = "";
          } else {
            activate();
          }
        },
        on_primary_click: () => {
          activate();
          opened.value = opened.value === name ? "" : name;
        },
      }),
      //Arrow(name, activateOnArrow && activate),
    ],
  }).hook(service, (box) => {
    box.toggleClassName("active", condition());
  });

export const Menu = ({ name, icon, title, content, haveTitle }) => {
  return Widget.Revealer({
    transition: "slide_down",
    reveal_child: opened.bind().as((v) => v === name),
    child: Widget.Box({
      class_names: ["menu", name],
      vertical: true,
      children: [
        haveTitle &&
        Widget.Box({
          class_name: "title-box",
          children: [
            icon,
            Widget.Label({
              class_name: "title",
              label: title,
              truncate: "end",
            }),
          ],
        }),
        Widget.Separator(),
        Widget.Box({
          vertical: true,
          class_name: "content vertical",
          children: content,
        }),
      ],
    }),
  });
};
