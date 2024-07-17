import Service from "resource:///com/github/Aylur/ags/service.js";
import Utils from "resource:///com/github/Aylur/ags/utils.js";

class PowerProfileService extends Service {
  static {
    Service.register(this, {}, { profile: ["string", "rw"] });
  }

  #profile = "balanced";
  #profiles = ["balanced", "performance", "power-saver"];

  async getActiveProfile() {
    let activeProfile = await Utils.execAsync("powerprofilesctl get ");

    return activeProfile;
  }

  async nextProfile() {
    let activeProfile = await this.getActiveProfile();

    const index = this.#profiles.indexOf(activeProfile);
    this.#profile = this.#profiles[(index + 1) % this.#profiles.length];

    Utils.execAsync(`powerprofilesctl set ${this.#profile}`);

    this.changed("profile");
  }

  get profile() {
    return this.#profile;
  }

  constructor() {
    super();
    this.getActiveProfile()
      .then((profile) => {
        this.#profile = profile;
        this.changed("profile");
      })
      .catch((e) => console.log(e));
  }
}

export default new PowerProfileService();
