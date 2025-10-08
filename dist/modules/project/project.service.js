"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectService = void 0;
const db_1 = require("../../config/db");
const createProject = async (data, authorId, imageUrl) => {
    var _a, _b, _c, _d, _e, _f;
    return db_1.prisma.project.create({
        data: {
            title: data.title,
            slug: data.slug,
            description: data.description,
            features: (_a = data.features) !== null && _a !== void 0 ? _a : [],
            technologies: (_b = data.technologies) !== null && _b !== void 0 ? _b : [],
            thumbnail: (_c = imageUrl !== null && imageUrl !== void 0 ? imageUrl : data.thumbnail) !== null && _c !== void 0 ? _c : null,
            liveUrl: (_d = data.liveUrl) !== null && _d !== void 0 ? _d : null,
            frontendRepoUrl: (_e = data.frontendRepoUrl) !== null && _e !== void 0 ? _e : null,
            backendRepoUrl: (_f = data.backendRepoUrl) !== null && _f !== void 0 ? _f : null,
            authorId,
        },
    });
};
const getAllProjects = async () => {
    return db_1.prisma.project.findMany({
        orderBy: { title: "asc" },
        // orderBy: { id: "asc" },
    });
};
const getProjectBySlug = async (slug) => {
    return db_1.prisma.project.findUnique({ where: { slug } });
};
const getProjectById = async (id) => {
    return db_1.prisma.project.findUnique({ where: { id } });
};
const updateProject = async (id, data, imageUrl) => {
    const payload = { ...data };
    if (imageUrl)
        payload.thumbnail = imageUrl;
    return db_1.prisma.project.update({ where: { id }, data: payload });
};
const deleteProject = async (id) => {
    return db_1.prisma.project.delete({ where: { id } });
};
exports.projectService = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    getProjectById,
    updateProject,
    deleteProject,
};
