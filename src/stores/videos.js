import { defineStore } from "pinia";
import { experiences } from "./experiences";
import { clients } from "./clients";

export const useVideoStore = defineStore("video", {
    state: () => {
        return {
            currentExperience: "",
            videoIndex: 0,
            currentVideo: "",
            experiences: [],
            isDarkMode: localStorage.getItem('isDarkMode') === 'true' ? true : false,
            selectedClient: null,
        }
    },

    getters: {
        // Get experiences for the selected client
        clientExperiences() {
            if (!this.selectedClient) return [];
            
            // Map the client's experience keys to actual experience data
            return this.selectedClient.experiences.map(expItem => {
                // Find the actual experience data by slug
                const experienceData = experiences.find(exp => exp.slug === expItem.slug);
                if (experienceData) {
                    return {
                        title: expItem.title,
                        slug: expItem.slug,
                        thumbURL: expItem.thumbURL,
                        videos: experienceData.videos
                    };
                }
                return null;
            }).filter(Boolean); // Remove null entries
        }
    },

    actions: {
        setSelectedClient(client) {
            this.selectedClient = client;
            // When client is selected, update experiences to match client's experiences
            this.experiences = this.clientExperiences;
            // Reset video playback state when switching clients
            this.currentExperience = "";
            this.videoIndex = 0;
            this.currentVideo = "";
        },
        
        // Optional: method to load experiences directly
        loadClientExperiences() {
            if (this.selectedClient) {
                this.experiences = this.clientExperiences;
            }
        }
    },
});
