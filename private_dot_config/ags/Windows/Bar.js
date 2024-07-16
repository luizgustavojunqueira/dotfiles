const Bar = (monitor = 0) => {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    class_name: "bar",
    anchor: ["top", "left", "right"],
    margins: [6, 6, 0, 6],
    exclusivity: "exclusive",
    layer: "top",
    child: Widget.CenterBox({
      endWidget: Widget.Button({
        label: "Menu",
        on_clicked: () => {
          App.toggleWindow("control-center");
        },
      }),
    }),
  });
};
export default Bar;
