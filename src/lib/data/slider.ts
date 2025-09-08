import config from "@/config";
import { ApiResponse } from "@/types/api";
import { ISlider } from "@/types/slider";

export const fetchSliders = async (): Promise<ApiResponse<ISlider[]>> => {
    const res = await fetch(`${config.API_URL}/api/v1/slider?isActive=true`, {
        next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
}
