import axios from "../utils/axios";
import serviceConfig from "../config/service.config";
import { AxiosResponse } from "axios";

export class NotificationApiService {
    private notificationBaseUrl: string;
    private iscHashApiKey: string;

    constructor() {
        this.notificationBaseUrl = serviceConfig.larvelNotificationUrl;
        this.iscHashApiKey = serviceConfig.iscHashApiKey;
    }

    async updateNotificationAsCompleted(id: string): Promise<AxiosResponse> {
        return await axios.put(
            `${this.notificationBaseUrl}/v1/isc/notifications/${id}/update-status?hash=${this.iscHashApiKey}`,
            {
                status: "completed"
            }
        );
    }
}

const notificationApiService = new NotificationApiService();

export default notificationApiService