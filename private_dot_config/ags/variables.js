import Variable from "resource:///com/github/Aylur/ags/variable.js";

export const uptime = Variable("", {
  poll: [
    60000,
    "cat /proc/uptime",
    (line) => {
      const uptime = Number.parseInt(line.split(".")[0]) / 60;

      if (uptime > 18 * 60) {
        return "Go Sleep";
      }

      const h = Math.floor(uptime / 60);
      const m = Math.floor(uptime % 60);
      return `${h}h:${m < 10 ? "0" + m : m}`;
    },
  ],
});
