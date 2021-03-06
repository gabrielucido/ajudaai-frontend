import axios from "axios";

import { BASE_API_URL } from "../utils/urls";
import { headers, get_or_create_token } from "../utils/core";
export class IssuesService {
  constructor() {
    this.apiRef = axios.create({
      baseURL: `${BASE_API_URL}/ajudaai/v1`,
      headers,
    });
  }

  async getIssues(page = 1) {
    const { data } = await this.apiRef.get(`/issues/?page=${page}`);
    return data;
  }

  async getIssueBySlug(slug) {
    const { data } = await this.apiRef.get(
      `/issues/${slug}/?token=${get_or_create_token()}`
    );
    return data;
  }

  async getSimilarIssues(payload) {
    // const { data } = await this.apiRef.get(`/issues/findRelated/?description=${payload.description}`);
    // const { data } = await this.apiRef.post(`/issues/findRelated/`, payload);
    const { data } = await this.apiRef.post(`/issues/search/`, payload);
    return data.results.slice(0, 3);
  }

  async addIssue(payload) {
    const { data } = await this.apiRef.post(`/issues/`, payload);
    return data;
  }

  async rateIssue(slug, upvote) {
    const { data } = await this.apiRef.post(`/issues/${slug}/rate/`, {
      upvote,
      token: get_or_create_token(),
    });
    return data;
  }

  async getIssueComments(slug) {
    const { data } = await this.apiRef.get(
      `/issues/${slug}/comments/?token=${get_or_create_token()}`
    );
    return data;
  }

  async getIssuesByDescriptionAndOrTime(description, startDate, endDate, page) {
    if (description !== "") {
      const { data } = await this.apiRef.get(
        `/issues/?page=${page}&description=${description}&start_date=${startDate}&end_date=${endDate}`
      );

      return data;
    }

    const { data } = await this.apiRef.get(
      `/issues/?page=${page}&start_date=${startDate}&end_date=${endDate}`
    );

    return data;
  }
}

export default new IssuesService();
