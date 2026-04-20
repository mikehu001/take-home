
import axios from "axios";
import { HomeListingResponse } from "./types";

export async function GET() {
  const { data } = await axios.get<HomeListingResponse>(
    "https://staging.homevision.co/api_project/houses"
  );

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
