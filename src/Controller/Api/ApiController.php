<?php

namespace App\Controller\Api;

use App\Entity\Project;
use App\Entity\Task;
use App\Entity\UploadedFile;
use App\Form\UploadedFileType;
use App\Repository\FolderRepository;
use App\Repository\ProjectRepository;
use App\Repository\ProjectStatusRepository;
use App\Repository\TaskRepository;
use App\Repository\TaskStatusRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class ApiController extends AbstractController
{
    /**
     * @Route("/project-post", name="project_post", methods={"POST"})
     */
    public function projectPost(Request $request, EntityManagerInterface $em, ProjectStatusRepository $projectStatusRepository)
    {
        $project = new Project();
        $contentObject = json_decode($request->getContent());
        $projectTitle = $contentObject->projectTitle;
        $projectDescription = $contentObject->projectDescription;
        $project->setDescription($projectDescription);
        $project->setTitle($projectTitle);
        $project->setProjectStatus($projectStatusRepository->find(1));
        $em->persist($project);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }

    /**
     * @Route("/project-put/{id<\d+>}", name="project_put", methods={"PUT"})
     */
    public function projectPut($id, Request $request, EntityManagerInterface $em, ProjectRepository $projectRepository)
    {
        $project = $projectRepository->find($id);
        $contentObject = json_decode($request->getContent());
        $projectTitle = $contentObject->projectTitle;
        $projectDescription = $contentObject->projectDescription;
        $project->setDescription($projectDescription);
        $project->setTitle($projectTitle);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }

    /**
     * @Route("/project-status-update", name="project_status_update", methods={"PUT"})
     */
    public function projectStatusUpdate(Request $request, EntityManagerInterface $em, ProjectRepository $projectRepository, ProjectStatusRepository $projectStatusRepository)
    {
        $contentObject = json_decode($request->getContent());
        $project = $projectRepository->find($contentObject->projectId);
        $newProjectStatus = $projectStatusRepository->find($contentObject->statusId);
        $project->setProjectStatus($newProjectStatus);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }

    /**
     * @Route("/task-status-update", name="task_status_update", methods={"PUT"})
     */
    public function taskStatusUpdate(Request $request, EntityManagerInterface $em, TaskRepository $taskRepository, TaskStatusRepository $taskStatusRepository)
    {
        $contentObject = json_decode($request->getContent());
        $task = $taskRepository->find($contentObject->taskId);
        $newTaskStatus = $taskStatusRepository->find($contentObject->statusId);
        $task->setTaskStatus($newTaskStatus);
        $em->flush();
        return $this->json($task, 200, [], ['groups' => 'get:tasks']);
    }

    /**
     * @Route("/task-user-put/{id<\d+>}", name="task_user_put", methods={"PUT"})
     */
    public function task_user_put($id, TaskRepository $taskRepository, Request $request, EntityManagerInterface $em, UserRepository $userRepository)
    {
        $task = $taskRepository->find($id);
        $contentObject = json_decode($request->getContent());
        $taskUser = $userRepository->find($contentObject->userId);
        $task->setUser($taskUser);
        $em->flush();
        return $this->json($task, 200, [], ['groups' => 'get:tasks']);
    }

    /**
     * @Route("/task-user-update", name="task_user_update", methods={"PUT"})
     */
    public function task_user_update(TaskRepository $taskRepository, Request $request, EntityManagerInterface $em, UserRepository $userRepository)
    {
        $contentObject = json_decode($request->getContent());
        $task = $taskRepository->find($contentObject->taskId);
        $taskUser = $userRepository->find($contentObject->userId);
        $task->setUser($taskUser);
        $em->flush();
        return $this->json($task, 200, [], ['groups' => 'get:tasks']);
    }

    /**
     * @Route("/task-post", name="task_post", methods={"POST"})
     */
    public function task_post(Request $request, EntityManagerInterface $em, TaskStatusRepository $taskStatusRepository, ProjectRepository $projectRepository)
    {
        $task = new Task();
        $contentObject = json_decode($request->getContent());
        $task->setTitle($contentObject->taskTitle);
        $task->setProject($projectRepository->find($contentObject->projectId));
        $task->setTaskStatus($taskStatusRepository->find(1));
        $em->persist($task);
        $em->flush();

        return $this->json($task, 200, [], ['groups' => 'get:tasks']);
    }

    /**
     * @Route("/task-put/{id<\d+>}", name="task_put", methods={"PUT"})
     */
    public function taskPut($id, Request $request, EntityManagerInterface $em, TaskRepository $taskRepository)
    {
        $task = $taskRepository->find($id);
        $contentObject = json_decode($request->getContent());
        $taskTitle = $contentObject->taskTitle;
        $task->setTitle($taskTitle);
        $em->flush();
        return $this->json($task, 200, [], ['groups' => 'get:tasks']);
    }

    /**
     * @Route("/task-delete/{id<\d+>}", name="api_task_delete", methods={"DELETE"})
     */
    public function taskDelete($id, EntityManagerInterface $em, TaskRepository $taskRepository)
    {
        $task = $taskRepository->find($id);
        $em->remove($task);
        $em->flush();
        return $this->json(null, 200, [], []);
    }

    /**
     * @Route("/project-delete/{id<\d+>}", name="api_project_delete", methods={"DELETE"})
     */
    public function projectDelete($id, EntityManagerInterface $em, ProjectRepository $projectRepository)
    {
        $project = $projectRepository->find($id);
        $tasks = $project->getTasks();
        foreach($tasks as $task){
            $em->remove($task);
        }
        $em->remove($project);
        $em->flush();
        return $this->json(null, 200, [], []);
    }

    /**
     * @Route("/file-upload/{id<\d+>}", name="api_file_upload", methods={"POST"})
     */
    public function fileUpload($id, FolderRepository $folderRepository, EntityManagerInterface $em)
    {
        $folder = $folderRepository->find($id);
        foreach($_FILES as $uploadedFile){
            $newPath = $this->getParameter('upload_directory')."/".$uploadedFile["name"];
            if(move_uploaded_file($uploadedFile["tmp_name"], "$newPath")){
                $newFile = new UploadedFile();
                $newFile->setFilePath($newPath);
                $em->persist($newFile);
                $folder->addUploadedFile($newFile);
            }
            $em->flush();
        }
        return $this->json(null, 200, [], []);
    }
}
