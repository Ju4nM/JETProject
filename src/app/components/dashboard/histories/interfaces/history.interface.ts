import TemperatureLimit from "../../control/interfaces/temperatureLimit.interface";
import User from "../../users/interfaces/user.interface";

export default interface History {

    state?: boolean;
    user?: User;
    limitTemperature?: TemperatureLimit;
    changeType: string;
	dateOfChange: Date;
}
