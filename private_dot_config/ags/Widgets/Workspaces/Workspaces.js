import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import { execAsync } from "resource:///com/github/Aylur/ags/utils.js";
import { Box, Button, Label } from "resource:///com/github/Aylur/ags/widget.js";

export const Workspaces = () => {
  const workspacesHolder = Box({
    class_name: "workspaces",
    children: Buttons(),
  });
  return workspacesHolder;
};
