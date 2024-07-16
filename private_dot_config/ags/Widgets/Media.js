import Widget from "resource:///com/github/Aylur/ags/widget.js";
import Mpris from "resource:///com/github/Aylur/ags/service/mpris.js";

const PlayButton = (player) => {
  return Widget.Button({
    class_name: "play-button",
    onClicked: () => player.playPause(),
    child: Widget.Icon({
      icon: player.bind("play-back-status").as((status) => {
        if (status === "Playing") return "media-playback-pause-symbolic";
        return "media-playback-start-symbolic";
      }),
    }),
  });
};

const NextButton = (player) => {
  return Widget.Button({
    class_name: "next-button",
    onClicked: () => player.next(),
    child: Widget.Icon({
      icon: "media-skip-forward-symbolic",
    }),
    visible: player.bind("can-go-next"),
  });
};

const PreviousButton = (player) => {
  return Widget.Button({
    class_name: "previous-button",
    onClicked: () => player.previous(),
    child: Widget.Icon({
      icon: "media-skip-backward-symbolic",
    }),
    visible: player.bind("can-go-prev"),
  });
};

const ShuffleButton = (player) => {
  return Widget.Button({
    visible: player.bind("shuffle-status").as((status) => status != null),
    class_name: player
      .bind("shuffle-status")
      .as((status) => (status ? "shuffle-button active" : "shuffle-button")),
    onClicked: () => player.shuffle(),
    child: Widget.Icon({
      icon: "media-playlist-shuffle-symbolic",
    }),
  });
};

const LoopButton = (player) => {
  return Widget.Button({
    onClicked: () => player.loop(),
    child: Widget.Icon({
      icon: player.bind("loop-status").as((status) => {
        if (status === "Track") return "media-playlist-repeat-song-symbolic";
        return "media-playlist-repeat-symbolic";
      }),
    }),
    visible: player.bind("loop-status").as((status) => status != null),
    class_name: player
      .bind("loop-status")
      .as((status) =>
        status !== "None" ? "loop-button active" : "loop-button",
      ),
  });
};

const MediaControls = (player) => {
  return Widget.Box({
    class_name: "media-controls",
    hexpand: true,
    hpack: "center",
    children: [
      ShuffleButton(player),
      PreviousButton(player),
      PlayButton(player),
      NextButton(player),
      LoopButton(player),
    ],
  });
};

const TrackInfo = (player) => {
  return Widget.Box({
    class_name: "track-info",
    vertical: true,
    children: [
      Widget.Label({
        class_name: "track-title",
        label: player.bind("track-title").as((title) => {
          if (title.includes("YouTube")) {
            return "Youtube";
          } else if (title.length > 16) {
            return title.slice(0, 16) + "...";
          }
          return title;
        }),
        justification: "left",
        xalign: 0,
      }),
      Widget.Label({
        class_name: "track-artist",
        label: player.bind("track-artists").as((artists) => artists.join(", ")),
        justification: "left",
        xalign: 0,
      }),
    ],
  });
};

const CoverArt = (player) => {
  return Widget.Box({
    class_name: "track-cover",
    vpack: "start",
    visible: player.bind("cover_path").as((path) => path != null),
    css: Utils.merge(
      [player.bind("cover_path"), player.bind("track_cover_url")],
      (path, url) =>
        `
            min-width: 120px;
            min-height: 120px;
            background-image: url('${path || url}');
        `,
    ),
  });
};

function lengthStr(length) {
  const min = Math.floor(length / 60);
  const sec = Math.floor(length % 60);
  const sec0 = sec < 10 ? "0" : "";
  return `${min}:${sec0}${sec}`;
}

function updatePositionSlider(slider, player) {
  if (slider.dragging) return;
  slider.value = player.position / player.length;
}

const PositionAndControl = (player) => {
  return Widget.Box({
    vertical: true,
    class_name: "position-box",
    children: [
      Widget.Slider({
        class_name: "position-slider",
        on_change: ({ value }) => (player.position = player.length * value),
        draw_value: false,
        hexpand: true,
      }).poll(1000, (self) => updatePositionSlider(self, player)),
      Widget.Box({
        class_name: "position-label",
        hexpand: true,
        children: [
          Widget.Label({
            label: lengthStr(player.position),
            class_name: "position-start",
            hpack: "start",
            hexpand: true,
          }).poll(1000, (self) => (self.label = lengthStr(player.position))),
          MediaControls(player),
          Widget.Label({
            class_name: "position-end",
            label: player.bind("length").as((length) => lengthStr(length)),
            hpack: "end",
            hexpand: true,
          }),
        ],
      }),
    ],
  });
};

let current = null;

const update = (box) => {
  const player = Mpris.getPlayer("spotify") || Mpris.players[0] || null;

  if (!player) {
    current = null;
    return;
  }
  if (player.entry == null) {
    box.visible = false;
    return;
  }

  current = player;
  box.children = [
    Widget.Box({
      vertical: false,
      children: [
        CoverArt(player),
        Widget.Box({
          vertical: true,
          children: [TrackInfo(player), PositionAndControl(player)],
        }),
      ],
    }),
  ];
};

export const MediaBox = () =>
  Widget.Box({
    className: "media-box",
  }).hook(Mpris, update, "notify::players");
