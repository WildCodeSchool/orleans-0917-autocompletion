<?php
/**
 * Created by PhpStorm.
 * User: sylvain
 * Date: 12/12/17
 * Time: 12:10
 */

namespace AppBundle\Controller;

use AppBundle\Repository\TownRepository;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;

class TownController extends Controller
{

    /**
     * @param Request $request
     * @param $town
     * @return JsonResponse
     * @Route("/town/list/{town}", name="list-town")
     */
    public function autocompleteAction(Request $request, $town)
    {
        if ($request->isXmlHttpRequest()){
            $repository = $this->getDoctrine()->getRepository('AppBundle:Town');
            $data = $repository->getTownLike('fr', $town);
            return new JsonResponse(["data" => json_encode($data)]);
        } else {
            throw new HttpException('500', 'Invalid call');
        }
    }
}
