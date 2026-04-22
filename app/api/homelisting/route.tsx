
import axios from "axios";
import { NextRequest } from "next/server";
import { HomeListingResponse } from "./types";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page") ?? "1";
  const perPage = request.nextUrl.searchParams.get("per_page") ?? "10";
  
  const { data } = await axios.get<HomeListingResponse>(
    `https://staging.homevision.co/api_project/houses?page=${page}&per_page=${perPage}`
  );

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
